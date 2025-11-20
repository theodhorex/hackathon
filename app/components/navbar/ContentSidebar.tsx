"use client";
import Image from "next/image";

export default function ContentSidebar() {
  const detectedContent = [
    {
      id: 1,
      url: "/sample-image-1.jpg",
      type: "image",
      status: "original",
      confidence: 98,
      size: "1920x1080",
    },
    {
      id: 2,
      url: "/sample-image-2.jpg",
      type: "image",
      status: "brand_ip",
      confidence: 95,
      brand: "Nike",
      size: "1280x720",
    },
    {
      id: 3,
      url: "/sample-image-3.jpg",
      type: "image",
      status: "registered",
      confidence: 87,
      owner: "0x742d...5678",
      size: "2560x1440",
    },
  ];

  return (
    <div className="w-[400px] h-[600px] bg-cream rounded-xl shadow-lg overflow-hidden border border-forest-green/10 flex flex-col">
      {/* Minimal Header */}
      <div className="bg-forest-green p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="text-white hover:bg-white/10 p-1.5 rounded-lg transition">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h2 className="text-white font-semibold text-sm">
                Detected Content
              </h2>
              <p className="text-mint-green text-xs">Current Page</p>
            </div>
          </div>
          <span className="bg-white/20 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
            {detectedContent.length}
          </span>
        </div>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-off-white">
        {detectedContent.map((content) => (
          <div
            key={content.id}
            className="bg-white border border-forest-green/10 rounded-lg p-3 hover:shadow-md transition-shadow"
          >
            {/* Image Preview */}
            <div className="relative w-full h-28 bg-mint-green/10 rounded-lg mb-2 overflow-hidden">
              <Image
                src={content.url}
                alt="content"
                fill
                className="object-cover"
              />

              {/* Status Badge */}
              <div className="absolute top-2 right-2">
                {content.status === "original" && (
                  <span className="bg-medium-green text-white px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Original
                  </span>
                )}
                {content.status === "brand_ip" && (
                  <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Brand IP
                  </span>
                )}
                {content.status === "registered" && (
                  <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Registered
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-forest-green">
                  {content.size}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-14 h-1 bg-mint-green/30 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        content.confidence > 90
                          ? "bg-medium-green"
                          : content.confidence > 70
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${content.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-semibold text-forest-green">
                    {content.confidence}%
                  </span>
                </div>
              </div>

              {content.brand && (
                <p className="text-[10px] text-forest-green/60">
                  Matched:{" "}
                  <span className="font-semibold text-forest-green">
                    {content.brand}
                  </span>
                </p>
              )}

              {content.owner && (
                <p className="text-[10px] text-forest-green/60">
                  Owner:{" "}
                  <span className="font-mono text-forest-green">
                    {content.owner}
                  </span>
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                {content.status === "original" ? (
                  <button className="flex-1 bg-gradient-to-r from-forest-green to-medium-green text-white py-1.5 rounded-md text-xs font-medium hover:shadow-md transition">
                    🛡️ Protect This
                  </button>
                ) : (
                  <button className="flex-1 bg-mint-green/20 text-forest-green py-1.5 rounded-md text-xs font-medium hover:bg-mint-green/30 transition">
                    View Details
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Action */}
      <div className="p-4 bg-white border-t border-forest-green/10">
        <button className="w-full bg-gradient-to-r from-forest-green to-medium-green text-white py-2.5 rounded-lg font-medium hover:shadow-lg transition flex items-center justify-center gap-2 text-sm">
          <span>
            Protect All Original (
            {detectedContent.filter((c) => c.status === "original").length})
          </span>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
