"use client";
import { useEffect, useState } from "react";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
function BookmarkButton({ property }) {


    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }
        checkBookmarkStatus(property._id).then((res) => {
            if (res.error) toast.error(res.error);
            if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
            setLoading(false);
            
        })
    }, [property._id, userId, isBookmarked]);
    const handleClick = async () => {
    if (!userId) {
      toast.error("You must be logged in to bookmark properties.");
      return;
    }

    bookmarkProperty(property._id).then((res) => {
        if(res.error) return toast.error(res.error);
        setIsBookmarked(res.isBookmarked);
        toast.success(res.message);
    });

    };

    if (loading) {
        return <h2>Loading...</h2>;
      }
  return  isBookmarked ? (
    <>
      <button className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center" onClick={handleClick}>
        <FaBookmark className="mr-2" /> Remove Property
      </button>
    </>
  ) : (
    <>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center" onClick={handleClick}>
        <FaBookmark className="mr-2" /> Bookmark Property
      </button>
    </>
  )
}

export default BookmarkButton;
