
interface BlogCardProps{
    authorName: string;
    title: string;
    content: string;
    publishedDate: string
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps) =>{
return <div className="p-4 border-b border-slate-200 pb-4">
            <div className="flex">
                <div className="flex ">
                    <Avatar name={authorName}/>
                </div>
                <div className="flex justify-center flex-col text-sm font-extralight pl-2">
                    {authorName} 
                </div>
                <div className="flex flex-col justify-center pl-2">
                    <Circle/>
                </div>
                <div className="flex justify-center flex-col pl-2 font-thin text-slate-500 text-sm">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0,100) + "..."}
            </div>
            <div className="text-sm text-slate-500 font-thin pt-4">
                {`${Math.ceil(content.length/100)} minute(s) read`}
            </div>
        </div>
}

function Circle (){
    return<div className="h-1 w-1 bg-slate-500 rounded-full ">

    </div>
}
export function Avatar({name,size = "small"}:{name:string , size?: "small" | "big"}){
    return <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10 "}  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>{name[0]}</span>
        </div>
}