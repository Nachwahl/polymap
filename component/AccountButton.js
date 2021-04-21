import React from 'react';
import {signIn, signOut, useSession} from 'next-auth/client'

const AccountButton = props => {
    const [session, loading] = useSession()
    return (
        <div>
            {!session &&
            <button
                className=" ml-2 hidden md:block bg-transparent border-blue-500 border-2 px-5 py-1 hover:bg-blue-600 transition focus:bg-blue-700 focus:ring ring-blue-700 focus:outline-none text-white mr-4"
                onClick={() => signIn()}>Login</button>
            }

            {session &&
                <div className="ml-2 hidden md:flex mr-4 items-center">
                    <p className="mr-3 text-gray-300">Logged in as {session.user.name}</p>
                    <button
                        className="  bg-transparent border-blue-500 border-2 px-5 py-1 hover:bg-blue-600 transition focus:bg-blue-700 focus:ring ring-blue-700 focus:outline-none text-white "
                        onClick={() => signOut({redirect: true})}>Logout</button>
                </div>

            }
        </div>
    );
}

export default AccountButton
