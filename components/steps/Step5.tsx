'use client'

export function Step5() {
  return (
    <div className="text-center py-12">
      {/* Logo/Brand */}
      <div className="mb-8">
        <h3 className="text-2xl font-serif text-gray-900">thrivelab</h3>
      </div>

      {/* Main card with gradient */}
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 rounded-3xl p-10 mb-8 max-w-lg mx-auto">
        <h1 className="text-5xl font-serif text-gray-900 mb-6">You're In!</h1>
        <p className="text-lg text-gray-700">
          The winner will be announced on our instagram page @mythrivelab
        </p>
      </div>

      {/* Body text */}
      <div className="max-w-xl mx-auto space-y-4 text-gray-700">
        <p>
          Thank you for sharing more about your health goals. Whether you're the giveaway winner or not, this is the first step toward exploring what's possible with regenerative medicine.
        </p>
        <p className="font-medium">
          We'll be in touch with the results soon.
        </p>
      </div>
    </div>
  )
}