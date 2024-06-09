import React from 'react'
//import { LayoutContext } from '../../Shared/userLayoutTitle';
import BookList from './BookList';

export default function Book() {
  //const { setTitle } = React.useContext(LayoutContext);
  // React.useEffect(() => {
  //   setTitle('Book')
  // }, [])

  // Drawer
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);



  return (
    <div style={{ flex: 1 }}>
      <BookList/>
      <div className="row flex-1 float-right mr-2">

      <button className="bg-primary--color m-2 text-[#fff] font-bold py-2 px-4 rounded" onClick={handleDrawerOpen}>Open Editing</button>

      {/* DRAWER */}
      <div className="flex-1">
        <div className="flex">
          <div className=" w-2/5">
            <div
              className={`fixed inset-0 bg-[#33333333] bg-opacity-50 z-50 transition-opacity ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            />
              <div
                style={{ background: 'white' }}
                className={`fixed inset-y-0 right-0 w-2/5 bg-white z-50 rounded-2xl transform transition-transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
              >
                {/* Drawer content */}
              
                <button className="bg-primary--color m-2 text-[#fff] font-bold py-2 px-4 rounded" onClick={handleDrawerClose}>
                  Close Editing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
);
}