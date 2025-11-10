const Units = ({loading, unitname, unitValue, unit}) => {
  return (
    <div className="bg-transparent-bg border border-transparent-bg-hover rounded-xl h-[110px] p-4">
        <h4 className="mt-1 text-sm dm-sans-regular text-gray-300">{unitname}</h4>
        {
            loading ? <p>_</p> : <div className="flex mt-3 items-center text-3xl dm-sans-light text-gray-100">
            <p>{unitValue}</p>
            <p>{unit}</p>
        </div>
        }
    </div>
  )
}

export default Units