

const contentData = [
  { id: 1, type: "Video", title: "Climate Change Explained", author: "NatGeo", url: "#" }
];

export default function ContentVideos() {

  return (
    <div className="max-w-7xl mx-auto p-6">
     

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentData.map((item) => (
          <div key={item.id} className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.author}</p>
            <a href={item.url} className="text-blue-500 mt-2 inline-block">
              View {item.type}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
