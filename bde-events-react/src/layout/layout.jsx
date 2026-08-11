import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <script src="https://cdn.tailwindcss.com"></script>
      <header>

<div class="has-[:checked]:dark">
 
  <input type="checkbox" id="theme-toggle-checkbox" class="peer hidden" />

  <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        
        <div class="flex-shrink-0">
          <a href="#" class="text-2xl font-bold text-gray-900 dark:text-white tracking-wide">
            My<span class="text-blue-600">App</span>
          </a>
        </div>

        
        <div class="flex items-center space-x-4">
          
          
          <label for="theme-toggle-checkbox" class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors select-none">
            
           
            <svg class="hidden peer-checked:block w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path>
            </svg>

            
            <svg class="block peer-checked:hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>

          </label>

         
          <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                       Se connecter
          </Link>

         
          <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none">
                       S'inscrire
          </Link>

        </div>
      </div>
    </div>
  </header>
</div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2023 My App. All rights reserved.</p>
      </footer>
    </div>
  )
}
