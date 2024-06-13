import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"


export const Blogs = () =>{
    return <div>
        <Appbar/>
        <div className="flex justify-center">
            <div className="max-w-xl">
                <BlogCard
                authorName={"Kunal Gupta"}
                title={"How an ugly single page website makes $5000 a month without affliate marketing "}
                content={"How an ugly single page website makes $5000 a month without affliate marketing "}
                publishedDate={"2nd feb 2024"}/>
                <BlogCard
                authorName={"Kunal Gupta"}
                title={"How an ugly single page website makes $5000 a month without affliate marketing "}
                content={"How an ugly single page website makes $5000 a month without affliate marketing "}
                publishedDate={"2nd feb 2024"}/>
                <BlogCard
                authorName={"Kunal Gupta"}
                title={"How an ugly single page website makes $5000 a month without affliate marketing "}
                content={"How an ugly single page website makes $5000 a month without affliate marketing "}
                publishedDate={"2nd feb 2024"}/>
            </div>
        </div>
    </div>
}