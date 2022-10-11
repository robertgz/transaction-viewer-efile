import React from "react";

import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR  = dynamic(() => import('./tableFile'), {
  ssr: false,
})

export default function DynamicFileTable () {
  return <DynamicComponentWithNoSSR />;
}
