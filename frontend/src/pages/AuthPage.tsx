import { useState } from "react";

type AuthPageProps = {
    isRegister: boolean;
    setIsRegister: (value: boolean) => void;

    name: string;
    setName: (value: string) => void;

    email: string;
    setEmail: (value: string) => void;

    password: string;
    setPassword: (value: string) => void;

    confirmPassword: string;
    setConfirmPassword: (value: string) => void;

    message: string;

    handleLogin: (event: React.FormEvent<HTMLFormElement>) => void;
    handleRegister: (event: React.FormEvent<HTMLFormElement>) => void;
};

function AuthPage({
    isRegister,
    setIsRegister,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    handleLogin,
    handleRegister,
}: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
    return (
        <main className="auth-page">
            <section className="auth-intro">
                <div className="auth-brand">
                    <div className="auth-brand-icon">H</div>
                    <span>Helpdesk</span>
                </div>

                <div className="auth-intro-content">
                    <span className="auth-eyebrow">HELPDESK TICKETING SYSTEM</span>
                    <h1>
                        Kelola setiap
                        <br />
                        masalah dengan
                        <br />
                        lebih terstruktur.
                    </h1>
                    <p>
                        Platform untuk membuat, memantau, dan mengelola
                        tiket bantuan dengan lebih mudah dan efisien.
                    </p>
                </div>

                <span className="auth-intro-footer">
                    Helpdesk Management System
                </span>
            </section>

            <section className="auth-content">
                <div className="auth-card">
                    <div className="auth-card-heading">
                        <span className="auth-card-label">
                            {isRegister ? 'MULAI SEKARANG' : 'SELAMAT DATANG KEMBALI'}
                        </span>

                        <h2>
                            {isRegister ? 'Buat akun baru' : 'Login ke akun Anda'}
                        </h2>

                        <p>
                            {isRegister
                                ? 'Lengkapi informasi berikut untuk membuat akun.'
                                : 'Masukkan email dan password untuk melanjutkan.'}
                        </p>
                    </div>

                    {message && (
                        <div className="auth-message" role="alert">
                            {message}
                        </div>
                    )}

                    {isRegister ? (
                        <form className="auth-form" onSubmit={handleRegister}>
                            <div className="auth-field">
                                <label htmlFor="name">Nama lengkap</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Masukkan nama lengkap"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />
                            </div>

                            <div className="auth-field">
                                <label htmlFor="register-email">Email</label>
                                <input
                                    id="register-email"
                                    type="email"
                                    placeholder="nama@email.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>

                            <div className="auth-field">
                                <label htmlFor="login-password">Password</label>

                                <div className="auth-password-wrapper">
                                    <input
                                        id="login-password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Masukkan password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>

                            <div className="auth-field">
                                <label htmlFor="confirmPassword">Konfirmasi password</label>

                                 <div className="auth-password-wrapper">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPass ? 'text' : 'password'}
                                    placeholder="Ulangi password"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    required
                                />

                                <button
                                        type="button"
                                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                                    >
                                        {showConfirmPass ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>

                            <button className="auth-submit" type="submit">
                                Buat Akun
                            </button>
                        </form>
                    ) : (
                        <form className="auth-form" onSubmit={handleLogin}>
                            <div className="auth-field">
                                <label htmlFor="login-email">Email</label>
                                <input
                                    id="login-email"
                                    type="email"
                                    placeholder="nama@email.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>

                            <div className="auth-field">
                                <label htmlFor="login-password">Password</label>

                                <div className="auth-password-wrapper">
                                    <input
                                        id="login-password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Masukkan password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>

                            <button className="auth-submit" type="submit">
                                Login
                            </button>
                        </form>
                    )}

                    <div className="auth-switch">
                        {isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'}
                        <button
                            type="button"
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? 'Login' : 'Daftar sekarang'}
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AuthPage;
