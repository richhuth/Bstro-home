import Head from 'next/head';
import { useRef, useState } from 'react';

function getFormData(object: any) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}

export default function Home() {
  const [email, setEmail] = useState('');

  const formRef = useRef(null);
  const scriptUrl =
    'https://script.google.com/macros/s/AKfycbwURb6eyYzm3O92yyemA0NIWkr5DQiLexcaK4ORY1tzOo5y1kYscNs19IanWAOBhYTKcA/exec';
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    // console.log(email);

    const formData = getFormData({ email });

    fetch(scriptUrl, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        console.log(res);
        // console.log('SUCCESSFULLY SUBMITTED');
        setSent(true);
        setSubmitting(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Bstro.</title>
        <meta name="description" content="Bringing you to good food" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-maroon p-4">
        <div className="flex items-center justify-center font-ProximaBold text-white ">
          <div className="border p-6 text-6xl text-white">Bstro.</div>
        </div>
        <div className=" mx-auto max-w-screen-md text-center text-xl leading-relaxed text-white">
          <p className="p-4">
            <span className="font-ProximaBold text-4xl">Ah</span>, the unwieldy
            lunch budget. Feel like it’s out of control? Well, you’re certainly
            not the only one. And you’ve come to the right place. Welcome to
            Bstro.
          </p>
          <p className="p-4">
            <span className="font-ProximaBold text-4xl">A</span> revolutionary
            experience that will transform and ease your lunch.
          </p>
          <p className="p-4">
            <span className="font-ProximaBold text-4xl">Imagine</span> a world
            where you can flick through hundreds of meal options around your
            home or office, pre-book and pay your meal then make your way to the
            restaurant while the kitchen is fully prepared to welcome you.
            Convenient. Effortless. Delicious.
          </p>

          <p className="p-4">
            <span className="font-ProximaBold text-4xl">Bstro</span> is a
            credit-based subscription that helps you discover hundreds of
            delicious lunch around you while you stay in total control of your
            eating out budget.
          </p>
          <p className="p-4">
            Sign up to learn more and be the first one to test Bstro.
          </p>
          <div className="mb-8 items-center px-6">
            {sent ? 'Thank you for email!' : ''}
            {submitting ? 'Sending...' : ''}
            {!sent && !submitting ? (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                name="google-sheet"
                className="flex "
              >
                <input
                  type="email"
                  required
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="  w-full rounded-l-lg border-y border-l border-gray-200 bg-white px-4 py-2 align-middle text-gray-800 focus:border-gray-500 focus:outline-none"
                  placeholder="Email address"
                />
                <button className="-ml-2 whitespace-nowrap rounded-r-lg border-gray-200 bg-white px-4 py-2 align-middle font-bold text-maroon hover:bg-gray-100">
                  Sign up
                </button>
              </form>
            ) : (
              ''
            )}
          </div>
        </div>
      </main>
    </>
  );
}
