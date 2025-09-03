'use client'

import React, { useState } from 'react'
import {
  SiWhatsapp,
  SiTelegram,
  SiReddit,
  SiQuora,
  SiFacebook,
  SiX,
  SiLinkedin,
} from 'react-icons/si'
import { Mail, Copy, Check, Share2 } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  url: string
  excerpt?: string
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, excerpt }) => {
  const [copied, setCopied] = useState(false)

  // Construct full URL
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url

  // Prepare sharing data
  const shareData = {
    title: encodeURIComponent(title),
    url: encodeURIComponent(fullUrl),
    text: encodeURIComponent(excerpt || title),
  }

  // Share URL generators
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${shareData.text}&url=${shareData.url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareData.url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareData.url}`,
    whatsapp: `https://wa.me/?text=${shareData.text}%20${shareData.url}`,
    telegram: `https://t.me/share/url?url=${shareData.url}&text=${shareData.text}`,
    reddit: `https://reddit.com/submit?url=${shareData.url}&title=${shareData.title}`,
    quora: `https://www.quora.com/q/create?url=${shareData.url}&title=${shareData.title}`,
    email: `mailto:?subject=${shareData.title}&body=${shareData.text}%0A%0A${shareData.url}`,
  }

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  // Open share window
  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
  }

  const shareButtons = [
    {
      name: 'X (Twitter)',
      icon: SiX,
      url: shareUrls.twitter,
      color: 'hover:bg-black hover:text-white',
    },
    {
      name: 'Facebook',
      icon: SiFacebook,
      url: shareUrls.facebook,
      color: 'hover:bg-[#1877F2] hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: SiLinkedin,
      url: shareUrls.linkedin,
      color: 'hover:bg-[#0A66C2] hover:text-white',
    },
    {
      name: 'WhatsApp',
      icon: SiWhatsapp,
      url: shareUrls.whatsapp,
      color: 'hover:bg-[#25D366] hover:text-white',
    },
    {
      name: 'Telegram',
      icon: SiTelegram,
      url: shareUrls.telegram,
      color: 'hover:bg-[#0088CC] hover:text-white',
    },
    {
      name: 'Reddit',
      icon: SiReddit,
      url: shareUrls.reddit,
      color: 'hover:bg-[#FF4500] hover:text-white',
    },
    {
      name: 'Quora',
      icon: SiQuora,
      url: shareUrls.quora,
      color: 'hover:bg-[#B92B27] hover:text-white',
    },
    {
      name: 'Email',
      icon: Mail,
      url: shareUrls.email,
      color: 'hover:bg-[#9C6BFF] hover:text-white',
      isEmail: true,
    },
  ]

  return (
    <>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Share2 className="w-5 h-5 text-[#9C6BFF]" />
        Share this article
      </h3>
      <div className="flex flex-wrap gap-3">
        {shareButtons.map((button) => {
          const IconComponent = button.icon
          return (
            <button
              key={button.name}
              onClick={() => {
                if (button.isEmail) {
                  window.location.href = button.url
                } else {
                  openShareWindow(button.url)
                }
              }}
              className={`p-3 bg-[#1A1A1A] rounded-lg transition-all duration-300 group hover:scale-110 ${button.color}`}
              title={`Share on ${button.name}`}
              aria-label={`Share on ${button.name}`}
            >
              <IconComponent className="w-5 h-5" />
            </button>
          )
        })}

        {/* Copy Link Button */}
        <button
          onClick={copyToClipboard}
          className="p-3 bg-[#1A1A1A] rounded-lg transition-all duration-300 hover:scale-110 hover:bg-[#9C6BFF] hover:text-white"
          title="Copy link"
          aria-label="Copy link to clipboard"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>
    </>
  )
}

export default ShareButtons
