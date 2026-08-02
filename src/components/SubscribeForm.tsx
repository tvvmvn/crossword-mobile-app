import { useState } from "react";

export default function SubscribeForm() {

  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      const res = await fetch('/api/proxy', {
        method: "POST",
        body: JSON.stringify({ email })
      });

      if (!res.ok) {
        throw new Error("Something's wrong");
      }

      setDone(true);
    } catch (ex) {
      alert(ex)
    }
  }

  return (
    <div className="px-4">
      {done ? (
        <p className="my-4">
          Thank you for subscribing us!
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3 className="font-semibold my-4">
            Subscribe us
          </h3>
          <div className="flex gap-2">
            <input 
              type="email" 
              className="border border-gray-400 p-2 grow" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="bg-black text-white px-4 py-2">
              Subscribe
            </button>
          </div>
        </form>
      )}
    </div>
  )
}