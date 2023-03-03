import { Oval } from "react-loader-spinner";

export function OvalSpinner({height, width}: {height: number, width: number}) {
    return <Oval
  height={height}
  width={width}
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#4fa94d"
  strokeWidth={4}
  strokeWidthSecondary={4}
/>
}