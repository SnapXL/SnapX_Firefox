const application = "SnapX";

const contextMenuItems = [
    { id: "SnapX_Upload_Image", title: "Upload image with SnapX", contexts: ["image"], action: "UploadImage" },
    { id: "SnapX_Upload_Video", title: "Upload video with SnapX", contexts: ["video"], action: "UploadVideo" },
    { id: "SnapX_Upload_Audio", title: "Upload audio with SnapX", contexts: ["audio"], action: "UploadAudio" },
    { id: "SnapX_Upload_Text", title: "Upload text with SnapX", contexts: ["selection"], action: "UploadText" },
    { id: "SnapX_Shorten_URL", title: "Shorten URL with SnapX", contexts: ["link"], action: "ShortenURL" }
];

chrome.runtime.onInstalled.addListener(() => {
    contextMenuItems.forEach(({ id, title, contexts }) => {
        chrome.contextMenus.create({ id, title, contexts });
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
    const { menuItemId, srcUrl, selectionText, linkUrl } = info;

    const selectedItem = contextMenuItems.find(item => item.id === menuItemId);

    if (!selectedItem) return;

    const message = {
        Action: selectedItem.action,
        ...(srcUrl && { URL: srcUrl }), 
        ...(selectionText && { Text: selectionText }), 
        ...(linkUrl && { URL: linkUrl }) 
    };

    chrome.runtime.sendNativeMessage(application, message);
});