import { useState, useEffect } from 'react';

/**
  * 
  *  Creates and updates all users data
  * 
  * @param {Object} tableData 
  * @param {Function} setTableData 
  * @param {Function} setUrl 
  * @returns {Object} { allUsers, setAllUsers, pageNumber, setPageNumber }  
  */
const useAllUsers = (tableData, setTableData, setUrl) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        setAllUsers((prevUsers) => {
            const newUsers = [...prevUsers];
            newUsers[pageNumber] = tableData;

            return newUsers;
        });

        if (tableData && pageNumber !== tableData.info.page) {
            setPageNumber(tableData.info.page);
        }
    }, [tableData]);

    useEffect(() => {
        if (allUsers[pageNumber]) {
            setTableData(allUsers[pageNumber]);
            return;
        }

        setUrl(`https://randomuser.me/api/?nat=us&page=${pageNumber}&results=20&seed=randomUsers`);
    }, [pageNumber]);

    return { 
        allUsers, 
        setAllUsers,
        pageNumber,
        setPageNumber
    };
};

export default useAllUsers;