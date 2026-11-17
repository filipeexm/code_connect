import { AuthRedirectPrompt } from '../../components/molecules/AuthRedirectPrompt/AuthRedirectPrompt'
import { LoginForm } from '../../components/organisms/LoginForm/LoginForm'
import type { LoginFormData } from '../../components/organisms/LoginForm/LoginForm'
import { SocialLoginGroup } from '../../components/organisms/SocialLoginGroup/SocialLoginGroup'
import type { SocialProviderId } from '../../components/organisms/SocialLoginGroup/SocialLoginGroup'
import { AuthTemplate } from '../../components/templates/AuthTemplate/AuthTemplate'

export interface LoginPageProps {
  onLoginSubmit?: (data: LoginFormData) => void
  onSocialLogin?: (provider: SocialProviderId) => void
  onNavigateToRegister?: () => void
  onForgotPassword?: () => void
}

export function LoginPage({
  onLoginSubmit,
  onSocialLogin,
  onNavigateToRegister,
  onForgotPassword,
}: LoginPageProps) {
  return (
    <AuthTemplate
      bannerSrc="/banner-login.png"
      bannerAlt="Pessoa programadora utilizando um notebook no Code Connect"
      title="Login"
      subtitle="Boas-vindas! Faça seu login."
      socialSection={<SocialLoginGroup onProviderClick={onSocialLogin} />}
      footer={
        <AuthRedirectPrompt
          promptText="Ainda não tem conta?"
          actionText="Crie seu cadastro!"
          onActionClick={onNavigateToRegister}
        />
      }
    >
      <LoginForm
        onSubmit={onLoginSubmit}
        onForgotPasswordClick={onForgotPassword}
      />
    </AuthTemplate>
  )
}
