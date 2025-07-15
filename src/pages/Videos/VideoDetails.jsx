import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../../components/VideoCard';
import { formatDistanceToNow } from 'date-fns';
import VideoDetailsSkeleton from '../../components/VideoDetailSkeleton';


function VideoDetails() {
  const { videoId } = useParams();


  // for API
  // const url = import.meta.env.VITE_API + `/public/youtube/videos/${videoId}`;
  // const urlComments = import.meta.env.VITE_API + `/public/youtube/comments/${videoId}`;
  const urlRelatedVidos = import.meta.env.VITE_API + `/public/youtube/related/${videoId}`;

  // for Local
  const url = "/youtube/videos.json";
  const urlComments = "/youtube/comments.json";



  const [videoDetails, setVideoDetails] = useState(null);
  const [videoComments, setVideoComments] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [fullDescription, setFullDescription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewComments, setViewComments] = useState(false);
  

  const toogleView = () => {
    setFullDescription(!fullDescription);
  }

  const toggleComments = () => {
    setViewComments(!viewComments);
  }

  const fetchVideoDetails = async () => {
    try {
      const [videoRes, commentRes, relatedRes] = await Promise.all([
        fetch(url),
        fetch(urlComments),
        fetch(urlRelatedVidos),
      ]);

      const [videoJson, commentJson, relatedJson] = await Promise.all([
        videoRes?.json(),
        commentRes?.json(),
        relatedRes?.json(),
      ]);

      // for API
      // if (videoJson) setVideoDetails(videoJson?.data?.video?.items);
      // if (commentJson) setVideoComments(commentJson?.data || []);
      // if (relatedJson) setRelatedVideos(relatedJson?.data?.data || []);

      // for local
      if (videoJson) {
        const data = videoJson?.channelVideos.find((video) => video?.items?.id === videoId);
        setVideoDetails(data.items);
      };
      if (commentJson) setVideoComments([]);
      if (relatedJson) setRelatedVideos([]);

    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideoDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [videoId]);

  if(loading){
    return <VideoDetailsSkeleton/>
  }

  if (!videoDetails) return <div className="text-white p-10">Not Found</div>;

  const video = videoDetails;
  const videoSnippet = video?.snippet;
  const videoTitle = videoSnippet?.title;
  const videoDesc = videoSnippet?.description;


  console.log(videoComments);
  

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left side: Video and Comments */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          {/* Video player */}
          <div className="aspect-w-16 aspect-h-9 w-full">
            <iframe
              src={`https://www.youtube.com/embed/${video?.id}`}
              title={videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>

          {/* Video details */}
          <h1 className="text-2xl font-bold mt-2">{videoTitle}</h1>
          <p className={`text-gray-300 whitespace-pre-line ${fullDescription ? "text-white" : "text-gray-400"}`} >
            {fullDescription ? videoDesc : videoDesc?.slice(0,108) } 
            {fullDescription ? <br/> : ""}
            <button 
            className='text-white font-bold' 
            onClick={toogleView}>
            {fullDescription ? "view Less" : "...more"}
            </button>
          </p>

          {/* Comments */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold hidden lg:flex mb-4">Comments</h2>
            <div onClick={toggleComments} className='flex lg:hidden w-full bg-gradient-to-b from-gray-700 to-slate-900 p-4 pb-8 rounded-lg justify-between'>
             <h2 className="text-xl font-semibold">Comments</h2>
             <span>click to view ⇅</span>
            </div>
            <div className="space-y-4">
              {videoComments.length === 0 && (
                <p className="text-gray-400">No comments found.</p>
              )}
              <div className='hidden lg:flex flex-col gap-3'>
                {videoComments.map((item) => {
                const comment = item.snippet.topLevelComment.snippet;
                let commentPbAt = formatDistanceToNow(new Date(comment.publishedAt));
                commentPbAt = commentPbAt.replace(/about |almost |over /g, '');
                return (
                  <div key={item.id} className="p-3 bg-gray-800 rounded-md">
                    <div className="flex items-start gap-3">
                      <img
                        src={comment?.authorProfileImageUrl}
                        alt={comment?.authorDisplayName || "User"}
                        className="w-10 h-10 rounded-full"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://i1.sndcdn.com/avatars-000331957710-t1t88c-t240x240.jpg";
                      }}
                      />

                      <div>
                        <div className='flex items-center'>
                        <h4 className="font-semibold mr-2">@{comment.authorDisplayName}</h4>
                        <p className='text-gray-300 text-xs'>{commentPbAt}</p>
                        </div>
                        <p className="text-gray-300">{comment.textDisplay}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              </div>
              <div className='lg:hidden flex flex-col gap-3'>
                { viewComments && videoComments.map((item) => {
                const comment = item.snippet.topLevelComment.snippet;
                let commentPbAt = formatDistanceToNow(new Date(comment.publishedAt));
                commentPbAt = commentPbAt.replace(/about |almost |over /g, '');
                return (
                  <div key={item.id} className="p-3 bg-gray-800 rounded-md">
                    <div className="flex items-start gap-3">
                      <img
                        src={comment?.authorProfileImageUrl}
                        alt={comment?.authorDisplayName || "User"}
                        className="w-10 h-10 rounded-full"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://i1.sndcdn.com/avatars-000331957710-t1t88c-t240x240.jpg";
                      }}
                      />

                      <div>
                        <div className='flex items-center'>
                        <h4 className="font-semibold mr-2">@{comment.authorDisplayName}</h4>
                        <p className='text-gray-300 text-xs'>{commentPbAt}</p>
                        </div>
                        <p className="text-gray-300">{comment.textDisplay}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              </div>
            </div>
          </div>
        </div>

        {/* Right side: Related videos */}
        <div className="w-full lg:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Related Videos</h2>
          <div className="space-y-4">
            {relatedVideos?.length === 0 && (
              <p className="text-gray-400">No related videos found.</p>
            )}
            {relatedVideos.map((item) => (
                <div className='my-4' key={item?.items?.id}>
                    <VideoCard video={item} />
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDetails;
