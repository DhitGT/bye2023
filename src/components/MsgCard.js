import React from "react";
import parse from "html-react-parser";

function MsgCard(props) {
  return (
    <>
      <div className="wrapper pt-6 flex">
        <div class="block h-32 p-4 lg:p-6 transition-all grow duration-500 bg-white border truncate lg:w-[30vw] w-[90vw] hover:h-max border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-2 text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.data.from}
          </h5>
          <p class="font-normal text-gray-700 text-sm lg:txt-base dark:text-gray-400">
            {parse(props.data.message)}
          </p>
        </div>
      </div>
    </>
  );
}

export default MsgCard;
