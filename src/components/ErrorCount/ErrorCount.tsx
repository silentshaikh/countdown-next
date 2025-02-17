"use client";
import React from 'react'
import { Alert } from 'antd';
import { useCustomHook } from '@/Context/Context';
function ErrorCount() {
    const {err,showMessage} = useCustomHook()
  return (
    <>
      {showMessage ? <Alert className='alert' message={err} type="info" /> : ""}
    </>
  )
}
export default ErrorCount;