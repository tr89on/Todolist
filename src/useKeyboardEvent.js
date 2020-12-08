import {useEffect} from 'react';

function useKeyboardEvent(key, callback, elemID) {
    useEffect(() => {
      const handler = function(event) {
        console.log('active element: ' + document.activeElement.id)
        if (event.key === key && document.activeElement.id === elemID) {
            callback()
        }
      }
      window.addEventListener('keydown', handler)
      return () => {
        window.removeEventListener('keydown', handler)
      }
    }, [key,callback,elemID])
}

export default useKeyboardEvent;