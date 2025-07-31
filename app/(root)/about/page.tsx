import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <>
      <div
        className=" hidden md:block w-full min-h-[500px] items-center justify-center 
        bg-[url('/lotus.jpg')] bg-cover bg-center bg-no-repeat bg-fixed"
      ></div>

      <div className="flex justify-center px-4 py-10 bg-blue-400 md:bg-gradient-to-r md:from-blue-400 md:to-purple-400">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center mb-8 ">About Us</h1>
          <div className="flex justify-center mb-8">
            <div className="w-56 h-56 rounded-full overflow-hidden shadow-lg flex items-center justify-center">
              <Image
                width={224}
                height={224}
                draggable="false"
                src="/BridgetHeadshot.jpg"
                alt="About Us"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <p className="text-lg text-justify mt-4 max-w-2xl mx-auto">
            We are dedicated to providing a serene space for individuals to
            explore the transformative practices of meditation and yoga. Our
            mission is to promote mental clarity, physical health, and emotional
            well-being through guided sessions and community support.
          </p>
          <p className="text-lg text-justify mt-4 max-w-2xl mx-auto">
            Founded by experienced instructors who believe deeply in the power
            of mindfulness, our studio offers a variety of classes tailored to
            all levels. Whether you are taking your first steps into meditation
            or are an advanced yogi seeking deeper practice, we provide a
            nurturing environment to help you grow.
          </p>
          <p className="text-lg text-justify mt-4 max-w-2xl mx-auto">
            Beyond classes, we host workshops, community gatherings, and
            retreats designed to foster connections and inspire lasting
            wellness. We believe that cultivating inner peace and balance
            enriches not only our own lives but also the lives of those around
            us.
          </p>
          <p className="text-lg text-justify mt-4 max-w-2xl mx-auto">
            Join us on this journey toward greater harmony and vitality.
            Together, we can build a community grounded in compassion,
            mindfulness, and joy.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
