export function PaymentFlow() {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-medium mb-4">Where Your Payment Goes</h3>

      <div className="space-y-6">
        <h3 className="font-medium text-base sm:text-lg">Payment Process</h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              1
            </div>
            <div>
              <h4 className="font-medium">Order Placement</h4>
              <p className="text-sm text-gray-600 mt-1">
                Your order is securely placed with all your card and shipping details.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              2
            </div>
            <div>
              <h4 className="font-medium">Payment Processing</h4>
              <p className="text-sm text-gray-600 mt-1">
                Your payment is securely processed through our payment provider.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              3
            </div>
            <div>
              <h4 className="font-medium">Order Confirmation</h4>
              <p className="text-sm text-gray-600 mt-1">
                You'll receive an email confirmation with your order details.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              4
            </div>
            <div>
              <h4 className="font-medium">Card Production</h4>
              <p className="text-sm text-gray-600 mt-1">
                Your custom NFC card is produced according to your specifications.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              5
            </div>
            <div>
              <h4 className="font-medium">Shipping</h4>
              <p className="text-sm text-gray-600 mt-1">
                Your card is shipped to your address with tracking information provided.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium mb-2">Payment Breakdown</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Card Production Cost:</span>
            <span>60%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Platform Maintenance:</span>
            <span>25%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Processing Fees:</span>
            <span>3%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping & Handling:</span>
            <span>12%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
