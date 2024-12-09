import { tab } from "@testing-library/user-event/dist/tab"
import axios from "axios"
import { useEffect, useState } from "react"

const News = () => {

    const [news, setNews] = useState([])
    const[isLoading, setLoading] = useState(true)

    const fetchData = async(tab) => {
        try{
            const { data: result } = await axios.get('https://ok.surf/api/v1/cors/news-feed')
            console.log("lenght:", result[tab].length)
            setNews(result[tab])
            setLoading(false)
        }catch(err){
            console.log(err)
            setLoading(false)
        }
    }

    const datetime = new Date().toLocaleString()

    useEffect(() => {
        fetchData('Business')
    }, [tab])
    
    if(isLoading){
        return <div>Fetching Latest News...</div>
     }

    return (
        <div className="m-3 p-3">
            <div>
                <div className="text-danger fw-bold fs-5">{datetime}</div>
                <h1 className="heading">THE DAILY NEWS</h1>
            </div>
          
            <div className="d-flex gap-0 justify-content-center bg-secondary mt-4">
                <button onClick={() => fetchData("Business")} className="btn btn-secondary rounded-0 p-2 fs-5 me-4 text-center news">Business</button>
                <button onClick={() => fetchData("Entertainment")} className="btn btn-secondary rounded-0 p-2 fs-5 me-4 text-center news">Entertainment</button>
                <button onClick={() => fetchData("Health")} className="btn btn-secondary rounded-0 p-2 fs-5 me-4 text-center news">Health</button>
                <button onClick={() => fetchData("Science")} className="btn btn-secondary rounded-0 p-2 fs-5 me-4 text-center news">Science</button>
                <button onClick={() => fetchData("Sports")} className="btn btn-secondary rounded-0 p-2 fs-5 me-4 text-center news">Sports</button>
                <button onClick={() => fetchData("Technology")} className="btn btn-secondary rounded-0 p-2 fs-5 me-4 text-center news">Technology</button>
                <button onClick={() => fetchData("US")} className="btn btn-secondary rounded-0 p-2 fs-5 me-4 text-center news">US</button>
                <button onClick={() => fetchData("World")} className="btn btn-secondary rounded-0 p-2 fs-5 me-4 text-center news">World</button>
            </div>
            <div className="p-4">
                {news.map((article, index) => {
                return <div key={index} className="mt-3 border-bottom border-black p-4">
                    <div className="d-flex align-text-center">
                        <img src={article.og} alt={article.og} style={{height: "25vh", width:"40vh"}} className="me-4"/>
                        <div className="d-flex flex-column jusitfy-content-center align-items-start mb-3">
                            <a href={article.link} className="news mb-auto p-2" >{article.title}</a>
                            <div className="d-flex align-items-center gap-2 p-2 ">
                                <img src={article.source_icon} alt="{article.source_icon}" style={{height: "4vh"}}/>
                                <div>{article.source}</div>
                            </div>
                        </div>
                        
                    </div>
                    
                    </div>
                })}
            </div>
        </div>
    );
    
}

export default News