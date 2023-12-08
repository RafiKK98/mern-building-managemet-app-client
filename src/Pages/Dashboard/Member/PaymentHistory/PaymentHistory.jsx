import usePayments from "../../../../Hooks/usePayments";
import { motion } from "framer-motion";

const PaymentHistory = () => {

    const [ paymentHistory ] = usePayments();


    return (
        <div className="my-10 w-2/3 mx-auto">
            <div className="text-center my-10">
                <h2 className="text-3xl font-medium bg-slate-500 py-5 rounded-md text-white">Payment History</h2>
            </div>
            <motion.div 
                className="overflow-x-auto"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 1}}
                >
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            <th>Date of payment</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        paymentHistory.map((payment, paymentIdx) => (
                            <tr key={payment._id}>
                                <th>
                                    { paymentIdx + 1}
                                </th>
                                <td>
                                    ${ payment.amount }
                                </td>
                                <td>
                                    { payment.transactionId }
                                </td>
                                <th>
                                    { payment.date }
                                </th>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </motion.div>
        </div>
    )
}

export default PaymentHistory