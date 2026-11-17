import { Divider } from '../../atoms/Divider/Divider'
import { SocialButton } from '../../molecules/SocialButton/SocialButton'

export type SocialProviderId = 'github' | 'gmail' | (string & {})

export interface SocialProviderItem {
  id: SocialProviderId
  label: string
  iconSrc: string
}

export interface SocialLoginGroupProps {
  dividerText?: string
  providers?: SocialProviderItem[]
  onProviderClick?: (providerId: SocialProviderId) => void
  className?: string
}

const DEFAULT_PROVIDERS: SocialProviderItem[] = [
  { id: 'github', label: 'Github', iconSrc: '/github.png' },
  { id: 'gmail', label: 'Gmail', iconSrc: '/gmail.png' },
]

export function SocialLoginGroup({
  dividerText = 'ou entre com outras contas',
  providers = DEFAULT_PROVIDERS,
  onProviderClick,
  className = '',
}: SocialLoginGroupProps) {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`.trim()}>
      <Divider text={dividerText} />
      <div className="flex items-center justify-center gap-6">
        {providers.map((provider) => (
          <SocialButton
            key={provider.id}
            label={provider.label}
            iconSrc={provider.iconSrc}
            onClick={() => onProviderClick?.(provider.id)}
          />
        ))}
      </div>
    </div>
  )
}
