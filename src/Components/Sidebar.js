// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import {
//   LayoutDashboard,
//   Users,
// } from 'lucide-react';

// const menuItems = [
//   { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
//   { icon: Users, label: 'Companies', href: '/companies' },
// ];

// export function Sidebar({ isOpen }) {
//   const router = useRouter();

//   return (
//     <aside
//       className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-white transition-transform lg:translate-x-0 ${
//         !isOpen ? '-translate-x-full' : ''
//       }`}
//     >
//       <nav className="flex flex-col gap-2 p-4">
//         {menuItems.map((item) => (
//           <Link key={item.href} href={item.href} passHref>
//             <a
//               className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-colors hover:text-gray-900 ${
//                 router.pathname === item.href ? 'bg-gray-100 text-gray-900' : ''
//               }`}
//             >
//               <item.icon className="h-5 w-5 text-gray-500" />
//               {item.label}
//             </a>
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }

// export default Sidebar;



import Link from 'next/link';
import {
    Factory,
  LayoutDashboard,
  Store,
  Users,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: 'dashboard' },
  { icon: Factory, label: 'Company', href: 'company' },
  { icon: Store, label: 'Shops', href: 'shops' },
  { icon: Users, label: 'Users', href: 'users' },
];

export function Sidebar({ isOpen }) {
  const pathname = usePathname();
//   console.log(pathname)

  // Determine which menu items to display based on the current path
  let filteredMenuItems = [];
  if (pathname.startsWith('/superadmin')) {
    filteredMenuItems = menuItems.filter(
      (item) => item.label === 'Dashboard' || item.label === 'Company'
    );
  } else if (pathname.startsWith('/company')) {
    filteredMenuItems = menuItems.filter(
      (item) => item.label === 'Dashboard' || item.label === 'Shops' || item.label === 'Users'
    );
  }
  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-white transition-transform lg:translate-x-0 ${
        !isOpen ? '-translate-x-full' : ''
      }`}
    >
      <nav className="flex flex-col gap-2 p-4">
        {filteredMenuItems.map((item,index) => (
          <div key={index}>
            <Link href={item.href} 
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-colors hover:text-gray-900 `}
            >
              <item.icon className="h-5 w-5 text-gray-500" />
              {item.label}
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
