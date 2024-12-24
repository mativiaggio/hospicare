import React from "react";

export default function LoadingScreen() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  return (
    <div className="!h-screen !w-screen overflow-hidden flex justify-center items-center pb-[100px] z-50 absolute bg-main top-0 left-0 right-0 bottom-0">
      <div className="flex flex-col gap-2 animate-bounce w-full justify-center items-center bg-main">
        <span className="flex gap-2">
          <span className="block dark:hidden">
            <svg
              width="100px"
              height="100px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M9 14.2354V17.0001C9 19.0504 10.2341 20.8125 12 21.584M14.8824 22.0001C16.7691 22.0001 18.3595 20.7311 18.8465 19.0001"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />{" "}
                <path
                  d="M12.2857 3H12.3774C12.6902 3 12.8467 3 12.9785 3.01166C14.4267 3.13972 15.5746 4.28763 15.7026 5.73574C15.7143 5.86761 15.7143 6.02404 15.7143 6.3369V7.23529C15.7143 8.2172 15.5121 9.15189 15.1471 10M5.42857 3H5.3369C5.02404 3 4.86761 3 4.73574 3.01166C3.28763 3.13972 2.13972 4.28763 2.01166 5.73574C2 5.86761 2 6.02404 2 6.3369V7.521C2 11.2292 5.00609 14.2353 8.71429 14.2353C9.78788 14.2353 10.805 13.9936 11.7143 13.5617"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />{" "}
                <circle
                  cx="19"
                  cy="16"
                  r="3"
                  stroke="#000000"
                  strokeWidth="1.5"
                />{" "}
                <path
                  d="M12 2V4"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />{" "}
                <path
                  d="M6 2V4"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />{" "}
              </g>
            </svg>
          </span>
          <span className="hidden dark:block">
            <svg
              width="100px"
              height="100px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M9 14.2354V17.0001C9 19.0504 10.2341 20.8125 12 21.584M14.8824 22.0001C16.7691 22.0001 18.3595 20.7311 18.8465 19.0001"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />{" "}
                <path
                  d="M12.2857 3H12.3774C12.6902 3 12.8467 3 12.9785 3.01166C14.4267 3.13972 15.5746 4.28763 15.7026 5.73574C15.7143 5.86761 15.7143 6.02404 15.7143 6.3369V7.23529C15.7143 8.2172 15.5121 9.15189 15.1471 10M5.42857 3H5.3369C5.02404 3 4.86761 3 4.73574 3.01166C3.28763 3.13972 2.13972 4.28763 2.01166 5.73574C2 5.86761 2 6.02404 2 6.3369V7.521C2 11.2292 5.00609 14.2353 8.71429 14.2353C9.78788 14.2353 10.805 13.9936 11.7143 13.5617"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />{" "}
                <circle
                  cx="19"
                  cy="16"
                  r="3"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />{" "}
                <path
                  d="M12 2V4"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />{" "}
                <path
                  d="M6 2V4"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />{" "}
              </g>
            </svg>
          </span>
          <span className="flex flex-col gap-2">
            <h1 className="text-5xl font-bold">Hospicare</h1>
            <p className="text-xl">por Madre Teresa Hospice</p>
          </span>
        </span>
      </div>
    </div>
  );
}
