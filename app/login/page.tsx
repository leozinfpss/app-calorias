export default function LoginPage() {
  return (
    <div className="h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Entre na sua conta</h1>
          <p className="text-muted-foreground mt-2">Continue sua jornada de saúde</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="w-full p-4 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full p-4 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-foreground text-background py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
