import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help | Tasknest",
  description: "Help, FAQs, and support information for Tasknest.",
};

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Help</h1>
        <p className="text-gray-600 mb-8">
          Find answers to common questions and learn how to get the most out of Tasknest.
        </p>

        <section className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Getting Started</h2>
          </div>
          <div className="p-6 space-y-3 text-gray-700">
            <p>
              - Go to <span className="font-medium">Dashboard</span> to see your overview.
            </p>
            <p>
              - Open the <span className="font-medium">Board</span> to create, drag, and organize tasks across columns.
            </p>
            <p>
              - Click a task to view or edit details, tags, type, and assignee.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="p-6">
            <dl className="space-y-6">
              <div>
                <dt className="font-medium text-gray-900">How do I create a new task?</dt>
                <dd className="text-gray-700 mt-1">
                  On the Board, use the add button or task blade to enter a title, description, type, tags, and assignee.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Can I move tasks between columns?</dt>
                <dd className="text-gray-700 mt-1">
                  Yes. Drag and drop tasks between columns like To Do, In Progress, and Done.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Why don’t I see any tasks on my dashboard?</dt>
                <dd className="text-gray-700 mt-1">
                  The dashboard shows tasks assigned to you. Make sure you’re assigned to the task.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Contact Support</h2>
          </div>
          <div className="p-6 text-gray-700">
            <p>
              Still need help? Email us at
              {" "}
              <a
                className="text-indigo-600 hover:underline"
                href="mailto:support@tasknest.example"
              >
                support@tasknest.example
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}


