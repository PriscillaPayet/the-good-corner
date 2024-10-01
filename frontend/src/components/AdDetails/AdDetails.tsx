
import { useParams } from "react-router-dom";

function AdDetails(){

    const {id} = useParams();
    return <p>Detail of ad {id}</p>

}

export default AdDetails;