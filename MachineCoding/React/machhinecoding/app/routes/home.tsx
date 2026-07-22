import { useState } from "react";
import { questions, type Question } from "~/data/questions";

// Question Components
import { AutoSuggestion } from "~/components/AutoSuggestion";
import { Tabs } from "~/components/Tabs";
import { Modal } from "~/components/Modal";
import { Counter } from "~/components/Counter";
import { TodoList } from "~/components/TodoList";
import { SearchAutocomplete } from "~/components/SearchAutocomplete";
import { SwitchCaseComponent } from "~/components/SwitchCaseComponent";
import { Pagination } from "~/components/Pagination";
import { Carousel } from "~/components/Carousel";
import { InfiniteScroll } from "~/components/InfiniteScroll";
import { DragDrop } from "~/components/DragDrop";
import { DetectOverlappingCircle } from "~/components/DetectOverlappingCircle";
import { FeatureFlag } from "~/components/FeatureFlag";
import { HandleRaceCondition } from "~/components/HandleRaceCondition";

const componentMap: Record<string, React.ComponentType> = {
  AutoSuggestion,
  Tabs,
  Modal,
  Counter,
  TodoList,
  SearchAutocomplete,
  SwitchCaseComponent,
  Pagination,
  Carousel,
  DetectOverlappingCircle,
  HandleRaceCondition,
  InfiniteScroll,
  DragDrop,
  FeatureFlag,
};

function getDifficultyColor(difficulty: Question["difficulty"]) {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800 border-green-200";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Hard":
      return "bg-red-100 text-red-800 border-red-200";
  }
}

export default function Home() {
  const [selectedQuestion, setSelectedQuestion] = useState<string>(
    questions[0]?.component ?? ""
  );

  const currentQ = questions.find((q) => q.component === selectedQuestion);
  const CurrentComponent = currentQ ? componentMap[currentQ.component] : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-slate-900">
            🚀 React Machine Coding
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Practice React concepts by building real-world components
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 px-4 py-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 min-h-[calc(100vh-176px)] bg-slate-50 border border-slate-200 rounded-3xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span className="text-xl">📚</span> Questions
          </h2>

          <div className="space-y-3">
            {questions.map((question) => (
              <button
                key={question.id}
                type="button"
                onClick={() => setSelectedQuestion(question.component)}
                className={`w-full text-left p-3 rounded-2xl transition-colors duration-200 ${
                  selectedQuestion === question.component
                    ? "bg-slate-800 text-white shadow-sm"
                    : "bg-white hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{question.title}</h3>
                    <p className="text-xs mt-1 opacity-70 line-clamp-1">
                      {question.description}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      selectedQuestion === question.component
                        ? "bg-slate-100 border-slate-200 text-slate-900"
                        : getDifficultyColor(question.difficulty)
                    }`}
                  >
                    {question.difficulty}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Question Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {currentQ?.title}
                  </h2>
                  <p className="text-slate-600 mt-2">
                    {currentQ?.description}
                  </p>
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                    getDifficultyColor(currentQ?.difficulty || "Easy")
                  }`}
                >
                  {currentQ?.difficulty}
                </span>
              </div>
            </div>

            {/* Component Render Area */}
            <div className="p-6 min-h-[500px] bg-slate-50">
              {CurrentComponent ? (
                <CurrentComponent />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                  Component not found
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
