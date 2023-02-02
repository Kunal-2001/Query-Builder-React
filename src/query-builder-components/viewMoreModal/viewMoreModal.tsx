import React, {useState} from 'react';
import './viewMoreModal.css';
import {IoIosCopy} from "react-icons/io";

type viewMoreQueryType = {
    setViewMoreQuery: Function;
    query: string;
}

export default function ViewMoreModal(props: viewMoreQueryType) {
  const {setViewMoreQuery, query} = props;
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(query);

    setIsSuccessMessageVisible(true);

    setTimeout(() => {
        setIsSuccessMessageVisible(false);
    }, 2000);
  }

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto min-h-32">
        <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setViewMoreQuery(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto rounded-md shadow-lg bg-white">
                <div className="mt-3 sm:flex">
                    <div className="mt-2 w-full text-center sm:text-left">
                        <div className='flex flex-row items-center justify-between'>
                            <h4 className="text-lg font-medium text-gray-800">
                                Query To Execute
                            </h4>
                            <button onClick={copyToClipboard}><IoIosCopy /></button>
                        </div>
                        {isSuccessMessageVisible && 
                            <div className='clipboard-success-msg'>
                                Copied to clipboard
                            </div>
                        }
                        <div className='bg-gray-300 p-4 rounded-md mt-2'>
                            <code className="mt-2 text-[15px] leading-relaxed text-gray-500">
                            {query}
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
