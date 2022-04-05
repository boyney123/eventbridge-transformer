/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const navigation = [
  { name: 'How it works', href: '#how-it-works' },
  { name: 'EventBridge Book', href: 'https://www.eventbridgebook.com/', target: '_blank' },
  { name: 'Learn EventBridge', href: 'https://github.com/boyney123/awesome-eventbridge', target: '_blank' },
];

export default function Example() {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      <div className="relative pt-6 pb-8 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
            <div className="hidden md:flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <a href="#">
                  <img src="https://eventbridge-atlas.netlify.app/img/eventbridge-icon.svg" alt="logo" className="rounded-md" />
                </a>
              </div>
            </div>
            <div className="hidden md:flex space-x-10">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="font-medium text-gray-200 hover:text-pink-400">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="md:hidden space-x-10 text-center w-full underline">
              <a key={navigation[0].name} href={navigation[0].href} className="font-medium text-gray-200 hover:text-pink-400">
                {navigation[0].name}
              </a>
              <a key={navigation[2].name} href={navigation[2].href} className="font-medium text-gray-200 hover:text-pink-400">
                {navigation[2].name}
              </a>
            </div>
            <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
              <span className="inline-flex rounded-md shadow">
                <a
                  href="https://github.com/boyney123/eventbridge-transformer"
                  target="_blank"
                  className="inline-flex items-center px-4 py-2 border text-base font-medium rounded-md text-gray-200 border-pink-500 hover:border-pink-200 bg-transparent "
                  rel="noreferrer"
                >
                  View on GitHub &rarr;
                </a>
              </span>
            </div>
          </nav>
        </div>

        <main className="mt-10 md:mt-24 mx-auto max-w-7xl px-4 ">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline  text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Amazon EventBridge Transformer</span>{' '}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-200 font-light sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">Quickly generate input transforms <span className="hidden md:inline-block">for Amazon EventBridge.</span></p>
            <p className="hidden md:block mt-3 max-w-md mx-auto text-base text-gray-400 font-light  md:mt-5 md:text-lg md:max-w-3xl">Enter your event, select properties to map, profit.</p>
            <p className="block md:hidden mt-3 max-w-md mx-auto text-base text-yellow-400 opacity-50 font-light  md:mt-5 md:text-lg md:max-w-3xl">⚠️ This tool is best viewed on a bigger screen ⚠️</p>
          </div>
        </main>
      </div>
    </div>
  );
}
