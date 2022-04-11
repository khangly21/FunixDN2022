//this is a functional component
//Nguyên tắc là Reducer điều khiển UI: khi được thông báo state có isLoading:true bởi Dishes reducer thì sẽ display a loading spinner
const Loading=()=>{
    //this spinner has primary color , and a small message "Loading". I am sure you can see in many websites and mobile applications
    return(
        <div className="col-12">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading...</p>
        </div>
    )
}