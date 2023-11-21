import { Text } from '@radix-ui/themes'

const Footer = () => {
  return (
    <div className = "w-screen h-[10vh] bg-teal-50 text-center justify-center absolute bottom-0 flex flex-col py-2">
        <Text className = "font-thin text-slate-400 text-xl">Created by Kumar Piyush</Text>
        <Text className = "font-thin text-slate-400 text-md">{`(vocarista)`}</Text>
    </div>
  )
}

export default Footer