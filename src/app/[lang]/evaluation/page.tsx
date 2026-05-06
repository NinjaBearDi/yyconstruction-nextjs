import { getDictionary } from '@/lib/get-dictionary';
import PageHeader from '@/components/ui/PageHeader';
import EvaluationForm from './EvaluationForm';

export default async function EvaluationPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const data = dict.evaluation;

  return (
    <main className="bg-white">
      <PageHeader title={data.header.title} breadcrumb={data.header.breadcrumb} lang={lang} />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <EvaluationForm lang={lang} dict={data.form} />
          </div>
        </div>
      </section>
    </main>
  );
}
