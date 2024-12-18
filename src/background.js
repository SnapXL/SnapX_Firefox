const application = "ShareX";

const contextMenuItems = [
    { id: "ShareX_Upload_Image", title: "Upload image with ShareX", contexts: ["image"], action: "UploadImage" },
    { id: "ShareX_Upload_Video", title: "Upload video with ShareX", contexts: ["video"], action: "UploadVideo" },
    { id: "ShareX_Upload_Audio", title: "Upload audio with ShareX", contexts: ["audio"], action: "UploadAudio" },
    { id: "ShareX_Upload_Text", title: "Upload text with ShareX", contexts: ["selection"], action: "UploadText" },
    { id: "ShareX_Shorten_URL", title: "Shorten URL with ShareX", contexts: ["link"], action: "ShortenURL" }
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