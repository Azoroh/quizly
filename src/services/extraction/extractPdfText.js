import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
//getDocument opens and parses the PDF
//GlobalWorkerOptions lets you tell PDF.js where its worker file is

import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
//this imports the worker file as a URL
//?url is a Vite feature
//PDF.js needs this worker to process the PDF off the main UI thread

GlobalWorkerOptions.workerSrc = pdfWorker //this connects PDF.js to the worker file, without this, PDF.js often fails in browser bundlers


export async function extractPdfText(file) {
    const arrayBuffer = await file.arrayBuffer() //uploaded file is a File object, PDF.js wants raw binary data, arrayBuffer() gives you that binary data

    const loadingTask = getDocument({ data: arrayBuffer }) //starts loading the PDF
    const pdf = await loadingTask.promise //waits until the document is parsed and ready


    const pageTexts = []

    //loops through every page in the PDF (PDF.js page nums start at 1, not 0)
    for (let i = 1; i <= pdf.numPages; i++) { // 'i' is pageNumber
        const page = await pdf.getPage(i) //gets one page
        const textContent = await page.getTextContent() //asks PDF.js for the text items on that page


        // every page returns many small text fragments
        // this pulls the visible text from each fragment
        // then joins them into one string for that page
        const pageText = textContent.items.map(item => ("str" in item ? item.str : "")).join(" ")
        pageTexts.push(pageText)

    }

    // combines all page text into one final string
    // this is what you’ll feed into quiz generation
    return pageTexts.join("\n\n").trim()

}