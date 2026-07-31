<?php

namespace App\Enums;

enum ReportAttachmentType: string
{
    case Reporter = 'reporter';
    case Handling = 'handling';
    case HandlingEvidence = 'handling_evidence';
}
