import { NextResponse } from "next/server";

export async function GET() {
  // Mocked tasks grouped by column
  const data = {
    todo: [
      {
        id: 101,
        title: "Design mockups",
        description: "Create wireframes for the new dashboard",
        tags: ["design"],
        type: "Feature",
        status: "Todo",
        assignee: { id: 1, name: "Despina Krstevska" }
      },
      {
        id: 102,
        title: "Write specs",
        description: "Document API specifications",
        tags: ["documentation"],
        type: "UserStory",
        status: "Todo",
        assignee: { id: 2, name: "Bob Smith" }
      },
    ],
    inProgress: [
      {
        id: 201,
        title: "Develop login page",
        description: "Implement user authentication",
        tags: ["urgent"],
        type: "Bug",
        status: "InProgress",
        assignee: { id: 1, name: "Despina Krstevska" }
      },
    ],
    done: [
      {
        id: 301,
        title: "Develop dashboard page",
        description: "Create the main dashboard interface",
        tags: ["frontend"],
        type: "Feature",
        status: "Done",
        assignee: { id: 3, name: "Charlie Lee" }
      },
    ],
  };

  return NextResponse.json(data);
}


