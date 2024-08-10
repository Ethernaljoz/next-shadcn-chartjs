import React from "react";
import Image from "next/image";
import profilePhoto from "../../public/assets/splash.png";
const PostItem = () => {
  return (
    <div className="cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 w-72 h-44 bg-neutral-50 rounded-lg shadow-xl flex flex-col items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-gray-200">
      <div className="flex   space-x-4 items-center ">
        <Image
          src={profilePhoto}
          alt="image"
          className="h-14 w-14 rounded-full object-cover"
          height={50}
          width={50}
          style={{ width: 50, height: 50 }}
        />
        <div>
          <h2 className="text-black font-bold text-xl">bradtraversy</h2>
          <p className="mt-1 text-gray-400 text-sm cursor-pointer">
            Visit Profile
          </p>
        </div>
      </div>
      <div>
        <span className="font-bold">Card title</span>
        <p className="line-clamp-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
};

export default PostItem;
