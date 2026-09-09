import Link from 'next/link';

export default function MerciPage() {
  return (
    <div className="py-24 px-4 max-w-2xl mx-auto text-center space-y-6">
      <div className="w-20 h-20 bg-[#feb323]/20 text-[#083415] rounded-full flex items-center justify-center text-4xl mx-auto">
        ❤️
      </div>
      <h1 className="text-4xl font-extrabold text-[#083415]">Un Grand Merci pour Votre Don !</h1>
      <p className="text-gray-600 text-base leading-relaxed">
        Votre contribution a bien été enregistrée via LeekPay. Votre générosité permet à LISDA ONG de mener ses actions de préservation et d'appui aux communautés à Dombe et Kribi.
      </p>
      <Link href="/" className="inline-flex px-8 py-3.5 rounded-full bg-[#083415] text-[#feb323] font-bold text-sm">
        Retour à l'accueil
      </Link>
    </div>
  );
}
