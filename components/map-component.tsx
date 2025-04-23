"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix Leaflet icon issues
const fixLeafletIcon = () => {
  delete L.Icon.Default.prototype._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  })
}

// Create custom marker icons
const createCustomIcon = (color, iconUrl = null) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            ${iconUrl ? `<img src="${iconUrl}" style="width: 20px; height: 20px; border-radius: 50%;" />` : "<span>C</span>"}
           </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })
}

// Create user location icon
const userLocationIcon = L.divIcon({
  className: "custom-div-icon",
  html: `<div style="background-color: #3b82f6; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
          <span>You</span>
         </div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
})

export default function MapComponent({ connections, selectedConnection, setSelectedConnection, userLocation }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef({})

  useEffect(() => {
    // Fix Leaflet icon issues
    fixLeafletIcon()

    // Initialize map if it doesn't exist
    if (!mapInstanceRef.current && mapRef.current) {
      // Create map centered on US
      mapInstanceRef.current = L.map(mapRef.current).setView([39.8283, -98.5795], 4)

      // Add tile layer (map style)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current)
    }

    return () => {
      // Clean up map on component unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Add user location marker
  useEffect(() => {
    if (mapInstanceRef.current && userLocation) {
      // Remove previous user marker if exists
      if (markersRef.current.userMarker) {
        markersRef.current.userMarker.remove()
      }

      // Add user location marker
      markersRef.current.userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userLocationIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup("Your current location")

      // Center map on user location
      mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 6)
    }
  }, [userLocation])

  // Add connection markers
  useEffect(() => {
    if (mapInstanceRef.current && connections.length > 0) {
      // Clear existing connection markers
      Object.values(markersRef.current).forEach((marker) => {
        if (marker !== markersRef.current.userMarker) {
          marker.remove()
        }
      })

      // Create bounds to fit all markers
      const bounds = L.latLngBounds()

      // Add connection markers
      connections.forEach((connection) => {
        const isSelected = selectedConnection && selectedConnection.id === connection.id
        const markerColor = isSelected ? "#000000" : "#ef4444"

        const marker = L.marker([connection.coordinates.lat, connection.coordinates.lng], {
          icon: createCustomIcon(markerColor, connection.avatar),
        })
          .addTo(mapInstanceRef.current)
          .bindPopup(`<b>${connection.name}</b><br>${connection.title}<br>${connection.location}`)
          .on("click", () => {
            setSelectedConnection(connection)
          })

        // Store marker reference
        markersRef.current[connection.id] = marker

        // Add to bounds
        bounds.extend([connection.coordinates.lat, connection.coordinates.lng])
      })

      // Add user location to bounds if available
      if (userLocation) {
        bounds.extend([userLocation.lat, userLocation.lng])
      }

      // Fit map to bounds with padding
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [connections, selectedConnection, setSelectedConnection])

  // Update selected marker
  useEffect(() => {
    if (mapInstanceRef.current && connections.length > 0) {
      // Reset all markers to default style
      connections.forEach((connection) => {
        if (markersRef.current[connection.id]) {
          markersRef.current[connection.id].setIcon(createCustomIcon("#ef4444", connection.avatar))
        }
      })

      // Highlight selected marker
      if (selectedConnection && markersRef.current[selectedConnection.id]) {
        markersRef.current[selectedConnection.id].setIcon(createCustomIcon("#000000", selectedConnection.avatar))
        markersRef.current[selectedConnection.id].openPopup()
      }
    }
  }, [selectedConnection, connections])

  return <div ref={mapRef} className="w-full h-[500px]" />
}
