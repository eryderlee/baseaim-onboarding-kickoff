import Header from "@/components/Header";
import SurveyForm from "@/components/SurveyForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-bg-ice to-white">
      <Header />
      <SurveyForm />
    </main>
  );
}
