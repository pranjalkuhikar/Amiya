import React from "react";

const About = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-lightgray to-primary/10 py-20 px-4 font-sans flex flex-col items-center">
      <section
        className="w-full max-w-3xl bg-white/95 rounded-3xl shadow-xl p-10 mb-12 border border-gray"
        style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
      >
        <h1 className="text-4xl font-extrabold mb-4 text-primary">
          About Amiya
        </h1>
        <p className="text-lg text-black mb-6">
          Amiya is redefining fashion for the future. Our journey began with a
          vision to blend timeless elegance with modern innovation, making style
          accessible and expressive for everyone. We believe in quality,
          creativity, and sustainability.
        </p>
        <p className="text-md text-gray">
          From humble beginnings to a leading name in contemporary fashion, our
          story is one of passion, perseverance, and a relentless pursuit of
          excellence.
        </p>
      </section>

      {/* Timeline Section */}
      <section
        className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-lg p-8 mb-12 border border-gray"
        style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-primary">Our Journey</h2>
        <ol className="relative border-l-4 border-primary pl-8">
          <li className="mb-8">
            <div className="absolute -left-5 top-1 w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
            <span className="font-semibold text-black">2018:</span> Amiya is
            founded with a mission to innovate fashion.
          </li>
          <li className="mb-8">
            <div className="absolute -left-5 top-1 w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
            <span className="font-semibold text-black">2020:</span> Launched our
            first sustainable collection.
          </li>
          <li className="mb-8">
            <div className="absolute -left-5 top-1 w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
            <span className="font-semibold text-black">2023:</span> Expanded
            globally, reaching customers in 20+ countries.
          </li>
          <li>
            <div className="absolute -left-5 top-1 w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
            <span className="font-semibold text-black">2025:</span> Leading the
            way in digital fashion experiences.
          </li>
        </ol>
      </section>

      {/* Achievements/Testimonials Placeholder */}
      <section
        className="w-full max-w-3xl bg-white/95 rounded-2xl shadow-lg p-8 border border-gray flex flex-col items-center"
        style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-primary">
          Achievements & Testimonials
        </h2>
        <div className="text-gray text-center mb-4">
          <p>
            "Amiya's designs are a breath of fresh air in the fashion industry!"
          </p>
          <p className="mt-2">- Fashion Magazine</p>
        </div>
        <div className="text-gray text-center">
          <p>"Exceptional quality and a truly modern shopping experience."</p>
          <p className="mt-2">- Happy Customer</p>
        </div>
      </section>
    </main>
  );
};

export default About;
