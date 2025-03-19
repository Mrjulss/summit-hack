'use client'

import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
    const [count, setCount] = useState(0);


    return (
        <div className="flex flex-col">
            This is the dashboard!
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>

            <Link href="/">back to main page</Link>
        </div>
    );
}
