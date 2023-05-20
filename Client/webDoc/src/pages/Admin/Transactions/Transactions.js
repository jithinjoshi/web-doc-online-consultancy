import "./Transactions.scss"
import Sidebar from "../../../components/Admin/sidebar/Sidebar"
import Navbar from "../../../components/Admin/navbar/Navbar"
import Table from "../../../components/Admin/table/Table";


const Transactions = () => {


  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div className="listContainer">
          <div className="listTitle">Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  )
}

export default Transactions