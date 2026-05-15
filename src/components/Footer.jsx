function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-taxi bg-slate-950/95 backdrop-blur-xl">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3 md:items-center">
          {/* Logo & Branding */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-taxi p-3">
                <svg className="h-6 w-6 text-slate-950" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-taxi">Taxi</p>
                <p className="text-lg font-bold text-white">Service</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">Professional rides, every time.</p>
          </div>

          {/* WhatsApp Section */}
          <div className="flex flex-col items-center">
            <p className="mb-2 text-sm uppercase tracking-wider text-slate-400">
              Available <span className="font-bold text-taxi">7/7</span> on WhatsApp
            </p>
            <a
              href="https://wa.me/1234567890"
              className="mb-2 flex items-center gap-2 text-xl font-bold text-taxi transition hover:text-taxi/80"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.9 1.271c-1.52.906-2.827 2.396-3.31 4.107-.48 1.71-.191 3.556.731 5.126 1.322 2.267 3.639 3.833 6.132 3.833h.006c1.966 0 3.87-.723 5.34-2.019l.46-.42 1.896.393 1.021-3.123-.734-1.259c.424-1.159.645-2.412.645-3.728 0-2.405-.823-4.507-2.425-6.02-1.602-1.514-3.809-2.406-6.331-2.406z" />
              </svg>
              +230 5955 0305
            </a>
            <p className="text-xs text-slate-500">Tap to open WhatsApp chat</p>
          </div>

          {/* Award & Social */}
          <div className="flex flex-col items-center md:items-end">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-taxi bg-slate-900/50">
              <div className="text-center">
                <p className="text-xs uppercase text-slate-400">Travellers'</p>
                <p className="font-bold text-taxi">Choice</p>
                <p className="text-xs text-slate-400">2026</p>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 transition hover:text-taxi" title="Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 transition hover:text-taxi" title="Instagram">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.25c5.385 0 9.75 4.365 9.75 9.75S17.385 21.75 12 21.75 2.25 17.385 2.25 12 6.615 2.25 12 2.25zm0 1.5c-4.556 0-8.25 3.694-8.25 8.25S7.444 20.25 12 20.25s8.25-3.694 8.25-8.25S16.556 3.75 12 3.75zm0 1.5c3.728 0 6.75 3.022 6.75 6.75S15.728 18.75 12 18.75s-6.75-3.022-6.75-6.75S8.272 5.25 12 5.25zm0 0.75c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 9c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 transition hover:text-taxi" title="YouTube">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="https://wa.me/1234567890" className="text-slate-400 transition hover:text-taxi" title="WhatsApp">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.9 1.271c-1.52.906-2.827 2.396-3.31 4.107-.48 1.71-.191 3.556.731 5.126 1.322 2.267 3.639 3.833 6.132 3.833h.006c1.966 0 3.87-.723 5.34-2.019l.46-.42 1.896.393 1.021-3.123-.734-1.259c.424-1.159.645-2.412.645-3.728 0-2.405-.823-4.507-2.425-6.02-1.602-1.514-3.809-2.406-6.331-2.406z" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 transition hover:text-taxi" title="TikTok">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.498 3.71c-1.258-.772-2.197-2.037-2.197-3.466V0h-3.604v15.515c0 1.902-1.545 3.438-3.448 3.438-1.902 0-3.447-1.536-3.447-3.438 0-1.902 1.545-3.438 3.447-3.438.277 0 .551.033.817.097V7.43c-.27-.047-.546-.062-.822-.062-4.406 0-7.98 3.576-7.98 7.98 0 4.406 3.574 7.98 7.98 7.98 4.405 0 7.98-3.574 7.98-7.98V8.31c1.577 1.215 3.607 1.938 5.782 1.938v-3.604c-1.24 0-2.409-.387-3.37-1.043z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-400">
            {currentYear} © <span className="font-semibold text-taxi">TAXI SERVICE</span>
          </p>
          <nav className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="transition hover:text-taxi">
              About us
            </a>
            <span className="text-slate-700">|</span>
            <a href="#" className="transition hover:text-taxi">
              Your Privacy
            </a>
            <span className="text-slate-700">|</span>
            <a href="#" className="transition hover:text-taxi">
              Refunds
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
