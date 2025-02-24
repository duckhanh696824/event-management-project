import { Suspense, useState } from "react";

const Loading = () => {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [isTextLoaded, setIsTextLoaded] = useState(false);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-indigo-400">
        <img
            src="/assets/images/loading page/Loadinglogo.gif"
            alt="Loading..."
            className={'w-[240px] mb-10 transition-opacity duration-500 ${isLogoLoaded ? "opacity-100" : "opacity-0"}'}
            onLoad={() => setIsLogoLoaded(true)}
        />
        <img
            src="/assets/images/loading page/Loadingtext.gif"
            alt="Loading..."
            className={'w-[200px] transition-opacity duration-500 ${isTextLoaded ? "opacity-100" : "opacity-0"}'}
            onLoad={() => setIsTextLoaded(true)}
        />
    </div>

  );
};


const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};


export { Loading, SuspenseWrapper };
