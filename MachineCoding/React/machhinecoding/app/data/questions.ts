// Machine Coding Questions Data
export interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  component: string;
}

export const questions: Question[] = [
  {
    id: "autoSuggestion",
    title: "Auto Suggestion",
    description: "Create an auto-suggestion input that provides real-time suggestions as the user types",
    difficulty: "Easy",
    component: "AutoSuggestion",
  },
  {
    id: "tabs",
    title: "Tabs",
    description: "Create a tabbed interface to switch between different content panels",
    difficulty: "Easy",
    component: "Tabs",
  },
  {
    id: "switch-case",
    title: "Switch Case Component",
    description: "Build a component that uses a switch statement to render different content based on selection",
    difficulty: "Medium",
    component: "SwitchCaseComponent",
  },
  {
    id: "modal",
    title: "Modal",
    description: "Create a modal/dialog component with overlay and close functionality",
    difficulty: "Easy",
    component: "Modal",
  },
  {
    id: "counter",
    title: "Counter",
    description: "Create a counter with increment, decrement and reset functionality",
    difficulty: "Easy",
    component: "Counter",
  },
  {
    id: "todo",
    title: "Todo List",
    description: "Create a todo list with add, delete and toggle completion",
    difficulty: "Medium",
    component: "TodoList",
  },
  {
    id: "search-autocomplete",
    title: "Search with Autocomplete",
    description: "Create a search input with autocomplete suggestions",
    difficulty: "Medium",
    component: "SearchAutocomplete",
  },
  {
    id: "pagination",
    title: "Pagination",
    description: "Create a pagination component for navigating large datasets",
    difficulty: "Medium",
    component: "Pagination",
  },
  {
    id: "carousel",
    title: "Image Carousel",
    description: "Create an image carousel with navigation and auto-play",
    difficulty: "Medium",
    component: "Carousel",
  },
  {
    id: "detect-overlapping-circle",
    title: "Detect Overlapping Circle",
    description: "Create a UI to detect and display overlapping circles",
    difficulty: "Medium",
    component: "DetectOverlappingCircle",
  },
  {
    id: "handle-race-condition",
    title: "Handle Race Condition",
    description: "Build a UI flow that safely handles race conditions in async requests",
    difficulty: "Hard",
    component: "HandleRaceCondition",
  },
  {
    id: "infinite-scroll",
    title: "Infinite Scroll",
    description: "Create infinite scroll functionality for loading more content",
    difficulty: "Hard",
    component: "InfiniteScroll",
  },
  {
    id: "drag-drop",
    title: "Drag and Drop",
    description: "Create drag and drop functionality for reordering items",
    difficulty: "Hard",
    component: "DragDrop",
  },
  {
    id: "feature-flag",
    title: "Feature Flag",
    description: "Implement a feature flag toggle to enable or disable a UI feature",
    difficulty: "Medium",
    component: "FeatureFlag",
  },
];

export const getQuestionById = (id: string): Question | undefined => {
  return questions.find((q) => q.id === id);
};