import { Heart, ShieldCheck, Smartphone } from 'lucide-react';

const receivingAccounts: {
  network: string;
  number: string | null;
  recipientName: string | null;
  accent: string;
}[] = [
  { network: 'MTN Mobile Money', number: '+256778222238', recipientName: 'Okello Timothy', accent: 'text-amber-400' },
  { network: 'Airtel Money', number: null, recipientName: null, accent: 'text-rose-400' },
];

export function MonthlySupport() {
  return (
    <section id="monthly-support" aria-labelledby="monthly-support-title" className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 id="monthly-support-title" className="flex items-center gap-2 text-xl font-bold font-heading text-white">
            <Heart className="w-5 h-5 text-brand-400" aria-hidden="true" />
            Support your station monthly
          </h2>
          <p className="text-sm text-slate-300 mt-2">Help keep IGOFARADIO 97.6 FM serving our community.</p>
        </div>
        <div className="rounded-xl border border-brand-500/30 bg-brand-500/10 px-4 py-3 sm:text-right">
          <p className="text-2xl font-black text-white">UGX 5,000 <span className="text-sm font-medium text-slate-300">/ month</span></p>
          <p className="text-xs text-brand-300 mt-1">Manual monthly support</p>
        </div>
      </div>

      <p className="text-sm text-slate-300">Send your support yourself each month using MTN or Airtel. This is not an automatic subscription: no recurring deductions, automatic renewal, or in-app payment processing.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {receivingAccounts.map(account => (
          <div key={account.network} className="rounded-xl border border-slate-700 bg-slate-950/60 p-5 space-y-3">
            <h3 className={`flex items-center gap-2 font-bold ${account.accent}`}>
              <Smartphone className="w-5 h-5" aria-hidden="true" />
              {account.network}
            </h3>
            {account.number ? (
              <dl className="text-sm space-y-2">
                <div><dt className="text-slate-400">Receiving number</dt><dd className="text-white font-bold break-words">{account.number}</dd></div>
                <div><dt className="text-slate-400">Recipient name</dt><dd className="text-white font-semibold break-words">{account.recipientName ?? 'Awaiting confirmation'}</dd></div>
                {!account.recipientName && (
                  <div className="text-amber-300"><dt className="font-semibold">Before sending</dt><dd>Do not send money until the station confirms the registered recipient name.</dd></div>
                )}
              </dl>
            ) : (
              <div className="text-sm">
                <p className="font-semibold text-slate-200">Receiving details not configured</p>
                <p className="text-slate-400 mt-1">The station must provide its verified receiving number and recipient name before you send money.</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-white">How to support each month</h3>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-300">
          <li>Wait for the station’s verified receiving details. Do not use a studio contact number as a payment number unless the station explicitly confirms it.</li>
          <li>Open your MTN Mobile Money or Airtel Money app or menu and choose the option to send money to a receiving number.</li>
          <li>Enter the verified number and UGX 5,000. Check the recipient name and any network fees before authorizing the transfer.</li>
          <li>Keep your transaction ID and contact station staff to request manual confirmation. This page cannot verify payments or mark you as paid.</li>
          <li>If you wish to continue supporting, repeat the transfer next month. Nothing is deducted automatically.</li>
        </ol>
      </div>

      <p className="flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-200">
        <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <span>Never share your Mobile Money PIN or one-time password with the station or enter it on this website. Authorize payments only through your mobile network’s trusted app or menu.</span>
      </p>
    </section>
  );
}
